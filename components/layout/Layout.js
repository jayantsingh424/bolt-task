import Header from './Header';

function Layout(props) {
  return (
    <div>
      <Header />
      <main className="main gap-4 mt-[80px] pt-[40px] font-mono">{props.children}</main>
    </div>
  );
}

export default Layout;