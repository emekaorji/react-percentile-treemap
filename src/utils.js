export const normalizeData = (data) => {
  const total = data.reduce((sum, item) => sum + item.percentage, 0);
  return data.map((item) => ({
    ...item,
    value: (item.percentage / total) * 100,
  }));
};

export const calculateLayout = (data, x, y, width, height, spacing) => {
  // Base case...
  if (data.length === 1) {
    return [
      {
        ...data[0],
        x: x + spacing / 2,
        y: y + spacing / 2,
        width: width - spacing,
        height: height - spacing,
      },
    ];
  }

  // Split the data into two groups
  const mid = Math.floor(data.length / 2);
  const firstGroup = data.slice(0, mid);
  const secondGroup = data.slice(mid);

  const firstGroupValue = firstGroup.reduce((sum, item) => sum + item.value, 0);
  const secondGroupValue = secondGroup.reduce(
    (sum, item) => sum + item.value,
    0
  );

  const splitHorizontally = width > height;

  if (splitHorizontally) {
    const totalValue = firstGroupValue + secondGroupValue;
    const firstWidth = (firstGroupValue / totalValue) * width;

    return [
      ...calculateLayout(firstGroup, x, y, firstWidth, height, spacing),
      ...calculateLayout(
        secondGroup,
        x + firstWidth,
        y,
        width - firstWidth,
        height,
        spacing
      ),
    ];
  } else {
    const totalValue = firstGroupValue + secondGroupValue;
    const firstHeight = (firstGroupValue / totalValue) * height;

    return [
      ...calculateLayout(firstGroup, x, y, width, firstHeight, spacing),
      ...calculateLayout(
        secondGroup,
        x,
        y + firstHeight,
        width,
        height - firstHeight,
        spacing
      ),
    ];
  }
};
