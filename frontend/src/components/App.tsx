import LeftSection from './LeftSection';
import RightSection from './RightSection';

function App() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 1, padding: '20px', borderRight: '1px solid black' }}>
        <LeftSection />
      </div>
      <div style={{ flex: 1, padding: '20px' }}>
        <RightSection />
      </div>
    </div>
  );
}

export default App;
