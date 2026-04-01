export type RunnerTraits = {
  vibe: "chill" | "speedy" | "explorer" | "party";
  time: "sunrise" | "noon" | "sunset" | "night";
  animal: "cat" | "dog" | "bird" | "dragon";
};

export type Runner = {
  id: string;
  name: string;
  avatarDataUrl: string;
  traits: RunnerTraits;
  joinedAt: string;
};
