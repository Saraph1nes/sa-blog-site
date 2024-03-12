import PropTypes from "prop-types";
import {Radio} from "@mui/material";

import './index.scss'

const SaColorPicker = ({onChange, value}) => {
  const colors = [
    '#ffa41d', '#EFA084', '#8EA063', '#BF94C1', '#55AAFA', '#C14444',
  ];

  return (
    <div className='sa-color-picker'>
      {colors.map((color) => (
          <Radio
            key={color}
            sx={{
              color: color,
              '&.Mui-checked': {
                color: color,
              },
            }}
            checked={value === color}
            onChange={() => {
              onChange(color)
            }}
            value={color}
          />
        )
      )}
    </div>
  )
    ;
}


SaColorPicker.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
}

export default SaColorPicker
