$(function() {
    // 点击去注册
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })


    // 点击去登录
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    let layer = layui.layer
    let form = layui.form

    form.verify({
        pwd: [/^\S{6,12}$/, '密码必须6到16位，且不能出现空格'],
        repwd: function(val) {
            if (val != $('.reg-box [name=password]').val()) {
                return '两次密码不一致'
            }
        }
    })

    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message, function() {
                    $('#form_reg')[0].reset()
                    $('#link_login').click()
                });
            }
        })
    })

    $('#form_login').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})