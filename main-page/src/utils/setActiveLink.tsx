const setActiveLink = ({ isActive }: { isActive: boolean }): string =>
  isActive ? 'link_active' : 'link'

export default setActiveLink
