export const disableControlProps = (controls: Array<string>) => {
  const result = controls.reduce((acc, control) => {
    acc[control] = { table: { disable: true } };
    return acc;
  }, {} as Record<string, { table: { disable: boolean } }>);

  return result;
};
