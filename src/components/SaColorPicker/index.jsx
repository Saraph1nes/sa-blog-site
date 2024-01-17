import PropTypes from "prop-types";
import {Checkbox, Radio} from "@mui/material";

import './index.scss'

const SaColorPicker = ({onChange, value}) => {
  const colors = [
    '#ff2d00', '#ff9800', '#ffc900', '#00ff2c',
    '#0040ff', '#4500ff', '#9600ff',
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
            onChange={(e) => {
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
