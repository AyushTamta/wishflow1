export interface StorySceneProps {
  onComplete: () => void;
}

export interface ActiveStorySceneProps extends StorySceneProps {
  active: boolean;
}