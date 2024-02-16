import '../styles/ContextMenu.css'
const ContextMenu = ({ x, y, onResetView }) => {

    return (
        <div
            className="context-menu"
            style={{
                position: 'absolute',
                top: y,
                left: x,
            }}
        >
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                <li style={{ padding: '8px', cursor: 'pointer' }} onClick={onResetView}>Reset View</li>
            </ul>
        </div>
    );
};
export default ContextMenu