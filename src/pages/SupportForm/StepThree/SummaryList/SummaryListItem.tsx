import { rem } from "polished";
import React from "react";
import styled from "styled-components";

import { SubtitleH4 } from "../../Layout";

const ListItem = styled.li`
  &:not(:last-of-type) {
    margin-bottom: ${rem(24)};
  }
`;

const Text = styled.span<{ error?: boolean }>`
  margin-top: ${rem(8)};
  display: inline-block;
  line-height: ${rem(19)};
  color: ${({ error, theme }) => (error ? theme.colors.error : "inherit")};
`;

type Props = {
  title: string;
  error?: boolean;
};

const SummaryListItem: React.FC<Props> = ({ title, error, children }) => {
  return (
    <ListItem>
      <SubtitleH4>{title}</SubtitleH4>
      <Text error={error}>{children}</Text>
    </ListItem>
  );
};

export default SummaryListItem;
