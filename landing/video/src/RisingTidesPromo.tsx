import { Composition } from "remotion";
import { PromoVideo } from "./PromoVideo";

export const RisingTidesPromo: React.FC = () => {
  return (
    <Composition
      id="RisingTidesPromo"
      component={PromoVideo}
      durationInFrames={1080} // 36 seconds at 30fps
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
