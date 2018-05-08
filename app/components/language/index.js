class language {

    async get(context){

        let lang = context.request.body.lang

        const languageDB = await db.import('../../dbTable/language.js')

        await languageDB.sync({alter: true})

        // 检测是否有语言
        let allSize = await languageDB.count()
        if ( allSize === 0 ){
            await this.setDefault()
        }

        let response

        if ( lang === undefined ){
            response = await languageDB.findAll()
        }
        if ( lang !== undefined ){
            response = await languageDB.findAll({
                attributes: ['keyword', lang]
            })
        }

        context.response.body = await utils.send(1, '', response, true)

    }
    async del(context){

        let id = context.request.body.id

        const languageDB = await db.import('../../dbTable/language.js')
        await languageDB.sync({alter: true})

        let response = await languageDB.destroy({
            where: {
                id: id
            }
        })

        if ( response === 1 ){
            context.response.body = await utils.send(1, '删除成功', '', true)
        }
        if ( response === 0 ){
            context.response.body = await utils.send(0, '删除成功', '', true)
        }

    }
    async reset(context){

        await this.setDefault()

        context.response.body = await utils.send(1, '已完成', '', true)

    }
    async setDefault(context){

        const languageDB = await db.import('../../dbTable/language.js')
        await languageDB.sync({force: true})

        await languageDB.bulkCreate([
            {keyword: 'index', en: 'Home', cn: '首页', kr: '메인 화면', jp: 'トップページ'},
            {keyword: 'video', en: 'Video', cn: '视频', kr: '동영상', jp: 'ビデオ'},
            {keyword: 'music', en: 'Music', cn: '音乐', kr: '음악', jp: '音楽'},
            {keyword: 'wordpress', en: 'WordPress', cn: 'WordPress', kr: 'WordPress', jp: 'WordPress'},
            {keyword: 'homepage', en: 'Home Page', cn: '家里', kr: '집', jp: '家'},
            {keyword: 'cloud', en: 'Cloud', cn: '云', kr: '구름', jp: '雲'},
            {keyword: 'updata', en: 'Updata', cn: '上传数据', kr: '업로드 자료', jp: 'アップロードデータ'},
            {keyword: 'note', en: 'Note', cn: '便签', kr: '메모지', jp: '便箋'},
            {keyword: 'signup', en: 'Sign up', cn: '注册', kr: '회원가입', jp: '登録する'},
            {keyword: 'login', en: 'Log in', cn: '登录', kr: '로그인', jp: 'サインイン'},
            {keyword: 'more', en: 'More', cn: '更多', kr: '더보기', jp: 'もっと'},
            {keyword: 'settings', en: 'Settings', cn: '设置', kr: '설치', jp: '設置'},
            {keyword: 'logout', en: 'Log out', cn: '退出', kr: '탈퇴', jp: '名目'},
            {keyword: 'language', en: 'Language', cn: '语言', kr: '언어', jp: '言語'},
            {keyword: 'chinese', en: 'Chinese', cn: '中文', kr: '중국어', jp: '中国語'},
            {keyword: 'english', en: 'English', cn: '英文', kr: '영문', jp: '英文'},
            {keyword: 'korean', en: 'Korean', cn: '韩语', kr: '한국어', jp: '韓国語'},
            {keyword: 'japanese', en: 'Japanese', cn: '日语', kr: '일본어', jp: '日本語'},
            {keyword: 'edit', en: 'Edit', cn: '编辑', kr: '편집하다', jp: '編集'},
            {keyword: 'delete', en: 'Delete', cn: '删除', kr: '삭제', jp: '削除'},
            {keyword: 'close', en: 'Close', cn: '关闭', kr: '닫다', jp: '閉鎖'},
            {keyword: 'empty', en: 'Empty', cn: '清空', kr: '비우다', jp: 'クリア'},
            {keyword: 'submit', en: 'Submit', cn: '提交', kr: '제출하다', jp: '提出する'},
            {keyword: 'year', en: 'Year', cn: '年', kr: '년', jp: '年'},
            {keyword: 'month', en: 'Month', cn: '月', kr: '월', jp: '月'},
            {keyword: 'day', en: 'Day', cn: '日', kr: '일', jp: '日'},
            {keyword: 'hour', en: 'Hour', cn: '时', kr: '때', jp: '時'},
            {keyword: 'minute', en: 'Minute', cn: '分', kr: '분', jp: '分'},
            {keyword: 'second', en: 'Second', cn: '秒', kr: '초', jp: '秒'},
            {keyword: 'Say Something...', en: 'Say Something...', cn: '说点什么...', kr: '뭐라고 말 좀...', jp: '何かと言って...'},
            {keyword: 'Click Add File', en: 'Click Add File', cn: '点击添加文件', kr: '다음 파일 추가', jp: 'クリックしてファイルを追加する'},
            {keyword: 'Add File', en: 'Add File', cn: '添加文件', kr: '파일 추가', jp: '追加ファイル'},
            {keyword: 'delete all', en: 'Delete All', cn: '全部删除', kr: '모두 삭제', jp: 'すべて削除する'},
            {keyword: 'username', en: 'User Name', cn: '用户名字', kr: '사용자 이름', jp: 'ユーザ名'},
            {keyword: 'password', en: 'Password', cn: '密码', kr: '비밀번호', jp: 'パスワード'},
            {keyword: 'Reenter The Password', en: 'Reenter The Password', cn: '重新输入密码', kr: '암호를 다시 입력하십시오', jp: 'パスワード再入力を再入力'},
            {keyword: 'verification', en: 'Verification', cn: '验证', kr: '검증', jp: '検証'},
            {keyword: 'portrait', en: 'Portrait', cn: '头像', kr: '초상화', jp: '肖像画'},
            {keyword: 'portrait upload', en: 'Portrait Upload', cn: '头像上传', kr: '초상화 업로드', jp: 'ポートレートのアップロード'},
            {keyword: 'reset', en: 'Reset', cn: '重置', kr: '다시 놓기', jp: 'リセット'},
            {keyword: 'upload', en: 'Upload', cn: '上传', kr: '업로드', jp: 'アップロード'},
            {keyword: 'select', en: 'Select', cn: '选择', kr: '선택', jp: '選択する'},
            {keyword: 'data', en: 'Data', cn: '资料', kr: '정보', jp: '情報'},
            {keyword: 'safety', en: 'Safety', cn: '安全', kr: '안전', jp: '安全'},
            {keyword: 'notice', en: 'Notice', cn: '通知', kr: '통지', jp: '通知'},
            {keyword: 'nickname', en: 'NickName', cn: '昵称', kr: '별명', jp: 'ニックネーム'},
            {keyword: 'gender', en: 'Gender', cn: '性别', kr: '성별', jp: 'セックス'},
            {keyword: 'email', en: 'E-mail', cn: '邮箱', kr: '이메일', jp: 'Eメール'},
            {keyword: 'id', en: 'ID', cn: 'ID', kr: 'ID', jp: 'ID'},
            {keyword: 'keyword', en: 'Keyword', cn: '关键词', kr: '키워드', jp: 'キーワード'},
            {keyword: 'gallery', en: 'Gallery', cn: '画廊', kr: '갤러리', jp: 'ギャラリー'},
            {keyword: 'uid', en: 'UID', cn: '用户ID', kr: '사용자ID', jp: 'ユーザーID'},
            {keyword: 'loading', en: 'Loading', cn: '加载中', kr: '가재중', jp: 'ロード中'},
        ])

    }

}
module.exports = language