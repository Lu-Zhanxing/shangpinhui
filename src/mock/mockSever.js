import Mock from 'mockjs'
import banners from './banners'
import floors from './floors'

Mock.mock('/mock/banners',{
    code: 200,
    data: banners
})

Mock.mock('/mock/floors',{
    code: 200,
    data: floors
})