const check_user = require("./check_user.js");


test('Shour return index ', () => {
    var users = [
        {
            id: 0,
            hash: '6%C0%B9%CCDR~ %FD%0A%0D%96%9D%FFe3Qe%E5%AA%3EM%60%01%12%C6%15%80%83%FE%9E%3D%8A%AC%F0%EB%B2%DC%86%FF%1F%FFr%09%A5%97%9Ca'
          },
          {
            id: 1,
            hash: '6%C0%B9%CCDR~ %FD%0A%0D%96%9D%FFe3Qe%E5%AA%3EM%60%01%12%C6%15%80%83%FE%9E%3D%8A%AC%F0%EB%B2%DC%86%FF%1F%FFr%09%A5%97%9Caa'
          },
          {
            id: 2,
            hash: '6%C0%B9%CCDR~ %FD%0A%0D%96%9D%FFe3Qe%E5%AA%3EM%60%01%12%C6%15%80%83%FE%9E%3D%8A%AC%F0%EB%B2%DC%86%FF%1F%FFr%09%A5%97%9Caaa'
          },
          {
            id: 3,
            hash: '6%C0%B9%CCDR~ %FD%0A%0D%96%9D%FFe3Qe%E5%AA%3EM%60%01%12%C6%15%80%83%FE%9E%3D%8A%AC%F0%EB%B2%DC%86%FF%1F%FFr%09%A5%97%9Caaaa'
          },
          {
            id: 4,
            hash: '6%C0%B9%CCDR~ %FD%0A%0D%96%9D%FFe3Qe%E5%AA%3EM%60%01%12%C6%15%80%83%FE%9E%3D%8A%AC%F0%EB%B2%DC%86%FF%1F%FFr%09%A5%97%9Caaaaa'
          }
        
      ]
     expect(check_user(users,'6%C0%B9%CCDR~ %FD%0A%0D%96%9D%FFe3Qe%E5%AA%3EM%60%01%12%C6%15%80%83%FE%9E%3D%8A%AC%F0%EB%B2%DC%86%FF%1F%FFr%09%A5%97%9Ca')).toBe(1)
})
