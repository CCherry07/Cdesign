import Menu, { MenuProps } from "./components/menu/menu";

function App() {
  const TestMenu:React.FC<MenuProps> = (props)=>{
    return <Menu {...props} defaultOpenSubMenus = { ["2"] } data-testid="test-menu" mode="vertical">
      <Menu.Item >cherry</Menu.Item>
      <Menu.Item disabled>KD</Menu.Item>
      <Menu.SubMenu title="dep">
          <Menu.Item >dep1</Menu.Item>
          <Menu.Item >dep2</Menu.Item>
          <Menu.Item >dep2</Menu.Item>
      </Menu.SubMenu>
      <Menu.Item >SIS</Menu.Item>
    </Menu>;
  }
  return (
    <div
      className="App"
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        background: 'linear-gradient(to right, #f6d365 0%, #fda085 100%)',
      }}
    >
     <TestMenu></TestMenu>
    </div>
  );
}
export default App;
