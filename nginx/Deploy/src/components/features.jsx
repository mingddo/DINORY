import ReactPlayer from 'react-player';

export const Features = (props) => {
  return (
    <div id='features' className='text-center'>
      <div className='container'>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '1065',
            height: '600',
            boxShadow: '8px 8px 16px 8px rgba(0, 0, 0, 0.4)',
          }}
        >
          <ReactPlayer
            url='https://youtu.be/_xLlMHapcX4'
            // playing='true'
            width='100%'
            height='100%'
            controls='true'
          />
        </div>

        {/* <div className='row'>
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.title}-${i}`} className='col-xs-6 col-md-3'>
                  {' '}
                  <i className={d.icon}></i>
                  <h3>{d.title}</h3>
                  <p>{d.text}</p>
                </div>
              ))
            : 'Loading...'}
        </div> */}
      </div>
    </div>
  );
};
