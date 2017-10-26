import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
    name: 'Tovi'
  }
];

const Users = [];

const vUsers = [];

for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }));
}

for(let i = 0; i < 86; i++){
    vUsers.push(Mock.mock({
        id:'@guid',
        name:'@cname',
        usename:'@word',
    }))
}

console.log(vUsers)
export { LoginUsers, Users ,vUsers};
