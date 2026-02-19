import { Box, BoxProps } from "./box.component";

export type RowProps = Omit<BoxProps, "flexDirection">;

export function Row(props: RowProps) {
  return <Box flexDirection="row" {...props} />;
}
