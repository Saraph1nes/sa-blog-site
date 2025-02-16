const baseURL = import.meta.env.DEV ? '/apis/api' : 'https://api.sablogs.cn/api';

const blogThemes = [
  {
    name: 'CLASSIC BLACK',
    chinese: '碧蓝',
    color1: '#000000',
    color2: '#D9E2E1',
    color3: '#ffffff',
    type: 'dark'
  },
  {
    name: 'CLASSIC WHITE',
    chinese: '碧蓝',
    color1: '#ffffff',
    color2: '#D9E2E1',
    color3: '#000000',
    type: 'light'
  },
  {
    name: 'AZURE',
    chinese: '碧蓝',
    color1: '#34BFE2',
    color2: '#D9E2E1',
    color3: '#1F4143',
    type: 'dark'
  },
  {
    name: 'MISTY RED',
    chinese: '雾红',
    color1: '#C14444',
    color2: '#7C4C68',
    color3: '#1F333E',
    type: 'dark'
  },
  {
    name: 'PEACH',
    chinese: '桃色',
    color1: '#F9BA80',
    color2: '#BE9D7C',
    color3: '#7BB2B1',
    type: 'light'
  },
  {
    name: 'DOGER BLUE',
    chinese: '道奇蓝',
    color1: '#55AAFA',
    color2: '#F5B9CA',
    color3: '#E8EAF9',
    type: 'light'
  },
  {
    name: 'MAUVE',
    chinese: '木槿紫',
    color1: '#BF94C1',
    color2: '#F1B2AB',
    color3: '#E8D4DF',
    type: 'light'
  },
  {
    name: 'DARK VIOLET',
    chinese: '暗夜紫',
    color1: '#A6A0CE',
    color2: '#6E4589',
    color3: '#163044',
    type: 'dark'
  },
  {
    name: 'PEARL PINK',
    chinese: '珍珠粉',
    color1: '#F7E1D2',
    color2: '#EFA084',
    color3: '#696B43',
    type: 'light'
  },
  {
    name: 'PALE BLUE',
    chinese: '灰蓝',
    color1: '#A6CBD7',
    color2: '#CEECEF',
    color3: '#E8EFEF',
    type: 'light'
  },
  {
    name: 'LIGHT MOSS GREEN',
    chinese: '浅苔绿',
    color1: '#D1C346',
    color2: '#8EA063',
    color3: '#774718',
    type: 'light'
  },
]

export {
  baseURL,
  blogThemes
}
