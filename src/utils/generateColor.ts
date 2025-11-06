export const getRandomColor = (): string => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const generateUniqueColors = (count: number): string[] => {
  const colors = new Set<string>();
  while (colors.size < count) {
    colors.add(getRandomColor());
  }
  return Array.from(colors);
};

// utils/colors.ts
export const invertColor = (hex: string, bw: boolean = false): string => {
  let color = hex.startsWith("#") ? hex.slice(1) : hex;

  // Handle 3-digit hex
  if (color.length === 3) {
    color = color
      .split("")
      .map((c) => c + c)
      .join("");
  }

  if (color.length !== 6) {
    throw new Error("Invalid HEX color.");
  }

  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);

  if (bw) {
    // Luminance formula for perceptual brightness
    const brightness = r * 0.299 + g * 0.587 + b * 0.114;
    return brightness > 186 ? "#000000" : "#FFFFFF";
  }

  const inverted = [r, g, b].map((c) =>
    (255 - c).toString(16).padStart(2, "0")
  );

  return `#${inverted.join("")}`;
};

export const withOpacity = (hex: string, opacity: number): string => {
  const alpha = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, "0");
  return `${hex}${alpha}`;
};
