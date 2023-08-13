
import hrclogo from '../hrclogo.svg'
import abclogo from '../abclogo.svg'
function Header() {
  return (
    <div style={{ padding: '10px' }}>
      <div style={{ textAlign: 'left', display: 'flex', position: 'absolute', flexDirection: 'column' }}>
        <img
          src={abclogo}
          alt='abclogo'

        />

      </div>
      <div style={{ textAlign: 'center' }}>
        <img
          src={hrclogo}
          alt='hrclogo'
          style={{ textAlign: 'center' }}
        />
      </div>
      <div style={{ display: 'flex', alignContent: 'left', height: '40px', padding: '10px' }}>
        <h1 style={{ display: 'contents', color: '#db4437' }}>Invoice List</h1>
      </div>

    </div>
  );
}

export default Header;
