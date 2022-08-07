import React from 'react';
import PropTypes from 'prop-types';

const LinearGradient = props => {
  const { data } = props;
  const boxStyle = {
    width: "70%",
    margin: '0px auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontStyle: 'oblique',
    color: `${data.toColor}`,
    fontWeight:'bold'
  };
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${data.fromColor} , ${data.toColor})`,
    height: 20
  };
  return (
    <div style={{margin: "20px"}}>
      <div style={boxStyle}>
        <span>{data.min}</span>
        <span className="fill"></span>
        <span>{`${Math.floor(data.max / 1000)}K`}</span>
      </div>
      <div style={{ ...boxStyle, ...gradientStyle }} className="mt8"></div>
    </div>
  );
};

LinearGradient.propTypes = {
  data: PropTypes.object.isRequired
};

export default LinearGradient;