export const getImageUrl = (img: { url: string }) => {
  if (!img?.url) return "/placeholder.png";
  return img.url.startsWith("http")
    ? img.url
    : `${process.env.NEXT_PUBLIC_API_URL}${img.url}`;
};