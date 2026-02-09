#!/usr/bin/env python3
"""
Add dependencies field to skill frontmatter based on cross-skill references.

Scans all SKILL.md files for:
1. ## Related Skills sections (recommended dependencies)
2. Orchestrator sub-skill tables (required dependencies)
3. Inline references like "see X skill" or "use Y for"
4. "invoke X" patterns in orchestrator skills
"""

import os
import re
import yaml
from pathlib import Path
from collections import defaultdict


def load_skill_ids(skills_dir: Path) -> set:
    """Load all valid skill IDs from the skills directory."""
    skill_ids = set()
    for skill_folder in skills_dir.iterdir():
        if skill_folder.is_dir() and (skill_folder / "SKILL.md").exists():
            skill_ids.add(skill_folder.name)
    return skill_ids


def parse_frontmatter(content: str) -> tuple[dict, str]:
    """Parse YAML frontmatter from markdown content."""
    if not content.startswith("---"):
        return {}, content

    parts = content.split("---", 2)
    if len(parts) < 3:
        return {}, content

    try:
        frontmatter = yaml.safe_load(parts[1])
        if frontmatter is None:
            frontmatter = {}
        body = parts[2]
        return frontmatter, body
    except yaml.YAMLError as e:
        print(f"  YAML error: {e}")
        return {}, content


def serialize_frontmatter(frontmatter: dict) -> str:
    """Serialize frontmatter dict to YAML string with proper formatting."""
    # Custom representer to handle lists on single line when short
    def represent_list(dumper, data):
        if all(isinstance(item, str) and len(item) < 30 for item in data) and len(data) <= 5:
            return dumper.represent_sequence('tag:yaml.org,2002:seq', data, flow_style=True)
        return dumper.represent_sequence('tag:yaml.org,2002:seq', data, flow_style=False)

    yaml.add_representer(list, represent_list)

    return yaml.dump(frontmatter, default_flow_style=False, allow_unicode=True, sort_keys=False)


def normalize_skill_name(name: str) -> str:
    """Convert skill name to kebab-case ID (e.g., 'Test Master' -> 'test-master')."""
    return name.lower().strip().replace(' ', '-')


def extract_related_skills(body: str, valid_skill_ids: set) -> list[str]:
    """Extract skills from ## Related Skills section."""
    related = []

    # Find Related Skills section
    related_match = re.search(r'##\s*Related\s*Skills\s*\n(.*?)(?=\n##|\Z)', body, re.DOTALL | re.IGNORECASE)
    if not related_match:
        return related

    section = related_match.group(1)

    # Match patterns like "- **skill-name**" or "- **Skill Name**" or "- skill-name:"
    skill_patterns = [
        r'-\s*\*\*([A-Za-z0-9][A-Za-z0-9 -]*[A-Za-z0-9])\*\*',  # **Skill Name** or **skill-name**
        r'-\s*`([a-z0-9-]+)`',  # `skill-name`
        r'-\s*\[([a-z0-9-]+)\]',  # [skill-name]
    ]

    for pattern in skill_patterns:
        for match in re.finditer(pattern, section, re.IGNORECASE):
            skill_name = normalize_skill_name(match.group(1))
            if skill_name in valid_skill_ids:
                related.append(skill_name)

    return list(set(related))


def extract_orchestrator_skills(body: str, valid_skill_ids: set) -> list[str]:
    """Extract skills from orchestrator sub-skill tables."""
    required = []

    # Find Sub-Skills table
    table_match = re.search(r'##\s*Sub-Skills.*?\n\|.*?\n\|[-|]+\n(.*?)(?=\n\n|\n##|\Z)', body, re.DOTALL)
    if not table_match:
        return required

    table_content = table_match.group(1)

    # Extract skill names from table rows like "| 1 | `react-dev` |"
    for match in re.finditer(r'\|\s*\d+\s*\|\s*`([a-z0-9-]+)`', table_content, re.IGNORECASE):
        skill_name = match.group(1).lower()
        if skill_name in valid_skill_ids:
            required.append(skill_name)

    return list(set(required))


def extract_inline_references(body: str, valid_skill_ids: set, skill_name: str) -> list[str]:
    """Extract inline skill references like 'see X skill', 'invoke X', 'use X for'."""
    referenced = []

    # Patterns for inline references
    patterns = [
        r'(?:see|invoke|use)\s+`?([a-z0-9-]+)`?\s+(?:skill|for)',  # see X skill, invoke X, use X for
        r'(?:invoke|→)\s+`([a-z0-9-]+)`',  # → `skill-name` or invoke `skill-name`
        r'\*\*([a-z0-9-]+)\s+skill\*\*',  # **skill-name skill**
        r'(?:Hand off|Hands off|Receives from|Implements|Creates tests from)\s+(?:to|from)?\s*\*?\*?([A-Za-z0-9 -]+)\*?\*?',  # Hand off to Test Master
    ]

    for pattern in patterns:
        for match in re.finditer(pattern, body, re.IGNORECASE):
            candidate = normalize_skill_name(match.group(1))
            if candidate in valid_skill_ids and candidate != skill_name:
                referenced.append(candidate)

    # Also check for specific nextjs-* security skill references
    nextjs_pattern = r'(nextjs-[a-z-]+)\s+skill'
    for match in re.finditer(nextjs_pattern, body, re.IGNORECASE):
        skill_name_match = normalize_skill_name(match.group(1))
        if skill_name_match in valid_skill_ids:
            referenced.append(skill_name_match)

    return list(set(referenced))


def analyze_skill(skill_path: Path, valid_skill_ids: set) -> dict:
    """Analyze a skill file for dependencies."""
    skill_name = skill_path.parent.name

    with open(skill_path, 'r', encoding='utf-8') as f:
        content = f.read()

    frontmatter, body = parse_frontmatter(content)

    # Extract different types of references
    related = extract_related_skills(body, valid_skill_ids)
    orchestrator = extract_orchestrator_skills(body, valid_skill_ids)
    inline = extract_inline_references(body, valid_skill_ids, skill_name)

    # Combine: orchestrator skills are required, others are recommended
    required = list(set(orchestrator))
    recommended = list(set(related + inline) - set(required))

    # Remove self-references
    required = [s for s in required if s != skill_name]
    recommended = [s for s in recommended if s != skill_name]

    return {
        'skill_name': skill_name,
        'required': sorted(required),
        'recommended': sorted(recommended),
        'frontmatter': frontmatter,
        'body': body,
        'original_content': content
    }


def update_skill_file(skill_path: Path, analysis: dict) -> bool:
    """Update skill file with dependencies field in frontmatter."""
    if not analysis['required'] and not analysis['recommended']:
        return False

    frontmatter = analysis['frontmatter']
    body = analysis['body']

    # Build dependencies structure
    dependencies = {}
    if analysis['required']:
        dependencies['required'] = analysis['required']
    if analysis['recommended']:
        dependencies['recommended'] = analysis['recommended']

    # Add dependencies to frontmatter
    frontmatter['dependencies'] = dependencies

    # Rebuild the file
    new_content = f"---\n{serialize_frontmatter(frontmatter)}---{body}"

    with open(skill_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

    return True


def main():
    # Find skills directory
    script_dir = Path(__file__).parent
    skills_dir = script_dir.parent / "skills"

    if not skills_dir.exists():
        print(f"Skills directory not found: {skills_dir}")
        return

    # Load valid skill IDs
    valid_skill_ids = load_skill_ids(skills_dir)
    print(f"Found {len(valid_skill_ids)} skills")

    # Analyze all skills
    skills_with_deps = []
    for skill_folder in sorted(skills_dir.iterdir()):
        if not skill_folder.is_dir():
            continue
        skill_path = skill_folder / "SKILL.md"
        if not skill_path.exists():
            continue

        analysis = analyze_skill(skill_path, valid_skill_ids)
        if analysis['required'] or analysis['recommended']:
            skills_with_deps.append(analysis)

    print(f"\nFound {len(skills_with_deps)} skills with dependencies:\n")

    # Report and update
    for analysis in skills_with_deps:
        print(f"{analysis['skill_name']}:")
        if analysis['required']:
            print(f"  required: {analysis['required']}")
        if analysis['recommended']:
            print(f"  recommended: {analysis['recommended']}")
        print()

    # Ask for confirmation
    response = input("Update skill files with dependencies? [y/N]: ")
    if response.lower() != 'y':
        print("Aborted.")
        return

    # Update files
    updated = 0
    for analysis in skills_with_deps:
        skill_path = skills_dir / analysis['skill_name'] / "SKILL.md"
        if update_skill_file(skill_path, analysis):
            print(f"Updated: {analysis['skill_name']}")
            updated += 1

    print(f"\nUpdated {updated} skill files.")


if __name__ == "__main__":
    main()
