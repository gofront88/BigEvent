$(function() {
    let form = layui.form
    form.verify({
        pwd: [/^\S{6,12}$/, '请输入6到12位的密码，且不能有空格'],
        samepwd: function(value) {
            if (value == $('[name=oldPwd]').val()) {
                return '新旧密码不能相同'
            }
            if (value != $('[name=rePwd]').val()) {
                return '两次新密码不一致'
            }
        }
    })
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status != 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)
                $('.layui-form')[0].reset()
            }
        })
    })
})