import { Box, BoxProps } from "./box.component";

export type ColumnProps = Omit<BoxProps, "flexDirection">;

export function Column(props: ColumnProps) {
  return <Box flexDirection="column" {...props} />;
}
