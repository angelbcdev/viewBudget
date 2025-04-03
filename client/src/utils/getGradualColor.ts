export const getGradualColor = (totalResults: number) => {
  let color = "#FF0000"; // Rojo intenso
  if (totalResults >= 5) color = "#FF2D00"; // Rojo medio
  if (totalResults >= 10) color = "#FF5500"; // Rojo anaranjado
  if (totalResults >= 20) color = "#FF7F00"; // Naranja fuerte
  if (totalResults >= 30) color = "#FFAA00"; // Naranja medio
  if (totalResults >= 40) color = "#FFCC00"; // Naranja amarillento
  if (totalResults >= 50) color = "#FFE000"; // Amarillo anaranjado
  if (totalResults >= 60) color = "#FFFF00"; // Amarillo
  if (totalResults >= 70) color = "#D4FF00"; // Amarillo verdoso
  if (totalResults >= 80) color = "#AAFF00"; // Verde lima
  if (totalResults >= 90) color = "#10FF10"; // Verde claro
  if (totalResults >= 100) color = "#00FF00"; // Verde más oscuro, pero sin llegar a ser completamente verde puro

  return color;
};
