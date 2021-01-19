export interface DesktopLayoutProps {
  /**
   * Menu elements for the top of the display
   */
  menuTop?: JSX.Element;
  /**
   * Menu elements for the bottom of the display. If left undefined,
   * there will be no bottom menu.
   */
  menuBottom?: JSX.Element;
  /**
   * Primary content to display
   */
  children?: JSX.Element;
  /**
   * Content to display in the sider. If left undefined
   * there will be no sider.
   */
  sider?: JSX.Element;
}
