import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');
export const DURATION = 700;
export const TITLE_SIZE = 36;
export const SPACING = 80;
export const IMAGE_SIZE = width * 0.8;
export const colors = {
  lightBg: '#F2F2F2',
  darkBg: '#2C2D51',
  lightText: '#E5E5DD',
  darkText: '#A5A6AA',
};
export const detailsList = ['prepTime', 'exp', 'skill', 'cousine', 'type'];
export const iconsByType: { [index: string]: any } = {
  prepTime: 'date-range',
  exp: 'badge',
  skill: 'accessibility',
  cousine: 'people-alt',
  type: 'school',
};
export type DataType = {
  [key: string]: string;
};
export const data: any = [
  {
    image:
      'https://scontent-hkg4-2.xx.fbcdn.net/v/t1.6435-9/124905760_824462594980012_5129757279504790127_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=8bfeb9&_nc_ohc=O3zR69ZMRuUAX9JPAsL&tn=vDjMjOoUB3Hk5OXo&_nc_ht=scontent-hkg4-2.xx&oh=97efb7439f932808ae155d4bb25df35a&oe=60FEE826',
    title: 'Hiếu Ăn Cơm',
    description: 'Kẻ huỷ diệt nụ cười, chuyên gia tư vấn trầm cảm, ông hoàng bóp nát niềm vui',
    prepTime: '**/**/1998',
    exp: '175 cm',
    skill: '75 kg',
    cousine: 'Độc thân',
    type: 'Đã tốt nghiệp',
  },
  {
    image:
      'https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/51679272_1190193774472916_4341282677131837440_n.jpg?_nc_cat=105&ccb=1-3&_nc_sid=174925&_nc_ohc=9XP2Mpl8a4MAX_Av2jJ&_nc_ht=scontent-hkg4-1.xx&oh=0c1b6bc9827151841836345197137760&oe=60FEBABC',
    title: 'Quốc Thợ Điện',
    description: 'Đoàn viên gương mẫu, chúa hề của phường Văn Quán, trùm tán gái khu vực Hà Đông',
    prepTime: '**/**/1998',
    exp: '170 cm',
    skill: '60 kg',
    cousine: 'Độc thân',
    type: 'Đã tốt nghiệp',
  },
  {
    image:
      'https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-1/p480x480/148233210_2895574657432078_1862609918047464885_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=7206a8&_nc_ohc=WB575H8TtEsAX9ThMqT&_nc_ht=scontent-hkg4-1.xx&oh=13dc9e0f1d4ee616a9b9ae0e9b3e08f4&oe=60FE2852',
    title: 'Khải Khoai Tây',
    description: 'Trùm vảy AWP, chuyên gia tư vấn tình cảm, vua đào hoa, bố của S1mple',
    prepTime: '**/**/1998',
    exp: '170 cm',
    skill: '74 kg',
    cousine: 'Độc thân',
    type: 'Đã tốt nghiệp',
  },
  {
    image:
      'https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/37893667_1760283197422687_3414199014034243584_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=0debeb&_nc_ohc=s5AU4391jaEAX8NH3TI&_nc_ht=scontent-hkg4-1.xx&oh=87c1210ee61104da7c84175636d1be2d&oe=60FD2F79',
    title: 'Minh Shirayuki',
    description:
      'Du học sinh kì cựu, giỏi hoá nhất lớp chuyên toán, nữ hoàng sinh học khu Phát Tín, tương lai phục hồi sông Tô Lịch',
    prepTime: '**/**/1998',
    exp: '165 cm',
    skill: '57 kg',
    cousine: 'Đang hẹn hò',
    type: 'Đã tốt nghiệp',
  },
];
