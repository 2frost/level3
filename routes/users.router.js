  //**회원가입 API **//

import express from 'express';
import { prisma } from '../utillls/prisma/index.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

/** 사용자 회원가입 API **/
router.post('/sign-up', async (req, res, next) => {
    try{
  const { nickname, password, confirm  } = req.body;
  const isExistUser = await prisma.users.findFirst({
    where: { nickname }
  });
  if (isExistUser) {
    return res.status(400).json({ message: '요청한 데이터 형식이 올바르지 않습니다.' });
    
  }


 // 비밀번호 암호화 
 const hashedPassword = await bcrypt.hash(password, 10);   // 사용자 비밀번호를 암호화합니다.
const userId = await prisma.users.create({
    data: { nickname , password: hashedPassword },
});   


  // Users 테이블에 사용자를 추가합니다.
  const user = await prisma.users.create({
    data: { nickname, password },
  });

  // 


  // UserInfos 테이블에 사용자 정보를 추가합니다.

  const users = await prisma.users.create({
    data: {
      nickname,
      password: hashedPassword,
    },
  });


  return res.status(201).json({ message: '회원가입이 완료되었습니다.' });
} catch (err) {
    return res
      .status(400)
      .json({ errorMessage: "요청한 데이터 형식이 올바르지 않습니다." });
  }
});


// ** 로그인 api ** // 
router.post('/sign-in', async (req, res, next) => {
    const { nickname, password } = req.body;
    const user = await prisma.users.findFirst({ where: { nickname } });

    if (!user)
    return res.status(401).json({ message: "존재하지 않는 이메일입니다." });
  // 입력받은 사용자의 비밀번호와 데이터베이스에 저장된 비밀번호를 비교합니다.
  else if (!(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });

    // 로그인에 성공하면, 사용자의 userId를 바탕으로 토큰을 생성합니다.
  const token = jwt.sign(
    {
      userId: user.userId,
    },
    'customized_secret_key',
  );

  // authotization 쿠키에 Berer 토큰 형식으로 JWT를 저장합니다.
  res.cookie('authorization', `Bearer ${token}`);
  return res.status(200).json({ message: '로그인 성공' });
}); 


// //**사용자조회 **//
// router.get('/users', authMiddleware, async (req, res, next) => {
//     const { userId } = req.user;
  
//     const user = await prisma.users.findFirst({
//         where: { userId: +userId },

export default router;