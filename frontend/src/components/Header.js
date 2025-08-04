export default function Header() {
  return (
    <header style={{
      background: '#3B82F6',
      color: 'white',
      padding: '15px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h1 style={{margin: 0}}>QR Feedback System</h1>
      <nav>
        <a href="/login" style={{color: 'white', marginLeft: '15px'}}>Login</a>
        <a href="/register" style={{color: 'white', marginLeft: '15px'}}>Register</a>
      </nav>
    </header>
  );
}
