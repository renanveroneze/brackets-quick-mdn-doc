define(function (require, exports, module) {

    "use strict";

    var extension_utils = brackets.getModule('utils/ExtensionUtils'),
        native_app = brackets.getModule('utils/NativeApp'),
        dialogs = brackets.getModule('widgets/Dialogs'),
        app_init = brackets.getModule('utils/AppInit'),
        command = brackets.getModule('command/CommandManager'),
        menus = brackets.getModule('command/Menus'),
        template = require('text!template.html');


    function open_modal() {

        var dialog = dialogs.showModalDialogUsingTemplate( template, false );

        $('.mdn-input').keyup(function( e ) {
            if( e.keyCode == '13' ) $('.mdn-submit').trigger('click');
            if( e.keyCode == '27' ) dialog.close();
        }).focus();

        $('.mdn-close').click(function() { dialog.close(); });
        $('.mdn-submit').click(function() {

            var query = $('.mdn-input').val();

            native_app.openURLInDefaultBrowser( 'https://developer.mozilla.org/pt-BR/search?q=' + query );
            dialog.close();

        });

    }

    app_init.appReady(function() {

        var icon = $("<a href='#'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0N0YzQzBGRDYxNUMxMUU0OTUwNEY2ODdDQzc5OUIwRCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0N0YzQzBGRTYxNUMxMUU0OTUwNEY2ODdDQzc5OUIwRCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjQ3RjNDMEZCNjE1QzExRTQ5NTA0RjY4N0NDNzk5QjBEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQ3RjNDMEZDNjE1QzExRTQ5NTA0RjY4N0NDNzk5QjBEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+WG3IEwAABHNJREFUeNq0Vt9rHFUU/u6dO7Mz+zvbxLS1adNKsdrUIloaQaGIVhFEVAp98lVBCGJefPBB+wcEKSo+1aeiWCVPguCPgFKhqYmxVSm6rYamhu2PZLOb2Z3duXOv50422Y27AV86cHeHmbPn+77znXPvMq017uYl1m8OfjwDzVoPLX6kqfRp2yuwTMJ5PWPrGV/Scx1heWUZTdmEm3AQqeiRZoQPnFRBu7YYC2V0USsFzhhmTwzHuXgHmEXrOaXU1MqKP11fbYwGjehopRn9tBTIyxZnL60HMsaO14Lw20q1fqHuB0eDhhxdbehppTFlcrRybVagIv3Vai14ihkVmlgIAYtpyKbCkgxHfFt/nvfYb1pFlWqldphgUgwKTDigMOgoQhCqY1TyY8mE9Q1leXoTwGrVP8QsEmQsISqECEbfksrS9JsIZJOVw3CEyQrhh+A2JbYJhshQreiGwKg8hp9fk4e6FFAEsWgZTsab3/nVBpVDYHRvBs/uzWO+XMNncwF5IMApthY0IFyLYile0mo1DO9lsjFn456y+0t17BzMY+L5PTi+y1sro0rhtfs9FDwLl+8EGJv8FUUikUgqEq5MQFcX8TbAGgOzVin57nwCZ0/s20jeMhc7Ug5cwXHk3gIeGy6gfrOGejUwGWKS66u7ROYFKQwCiYeH+/DhCwfxYL/XxaguFRrNEPkk8Nbju6FsG5NX6iiXfGRyNizysXO22gqoppGM4pd7+lz0e3zL4eGcoVInEFfgvWf245dXH8LJR/tRb0qEBN5ZKt7pgY7MkGg4lgWbsS0BWAskoCmr1QIC4hgf3Y6RvIN6XcZ5enoQkfwktzDU5+H/biDKtDSp7vMECgkLirrJrC4AI8uMQcUPMDe/hDKx63Xp1hKkwOpQaUqraNhi9lEPkzdkEdC1UhXFOzXs25b7D1sVD1bSdWA7VgvKjot2fr6MmRs+7RFm2HoBKN3a6CxcXaxicnYRT+7fDtFiad5ykphMJfFDsYR3vr6KDJXk5cM7ML0Q4pOZW3BtjhQ90z0VtJw3ZZJS4sc/b2KxEmAo520Yaz4vlSoYP/szLl65jXTGxncXrkNkB5CmOCNKy6j3oK3tPzpu14QjcGMpwLnZUpcHl4q3ULxdgzuQgkvt7OZd5AjIFErJtU7coovaUyiIiaRan5r8A2NfFFEO2qyuLwfxoHGu1/rdbFotcptWt8nthwbEpna1qJ5npq7hy7l/8MSBe1BIWfj+90XaojkcxuPBZHRKSSEhhOGqtj7R1j1QIX1zHbmOU8p5tkonnF1lv4Fz5/+GboSw7QAJmnIVhrHxXtJZSDkWDyM12JCRZdqXsx4eRIGMVeSz3vLQQPbdvrQ7TKfYgf60PV7w7L8G8x6yuUTsdtiQyKa9lZ39uVMWtx6gmPsGUvYbKZvPmzOBlLEuBYV8ckEI623PEWdUezMJqX0n6IQ6nXWdk5Uamyg7Ae2qzpuOEJ8qrWXHAL6/LSk+orl4ZdlvvLixrdztfxUcd/n6V4ABACH2Ucrn8UHSAAAAAElFTkSuQmCC'></a>")
                    .appendTo($("#main-toolbar .buttons"));

        icon.click(function() { open_modal() });

        var MDN_DOC_EXECUTE = 'com.mdn.doc';
        command.register('MDN Doc', MDN_DOC_EXECUTE, open_modal);

        var menu = menus.getMenu(menus.AppMenuBar.FIND_MENU);
        menu.addMenuItem(MDN_DOC_EXECUTE, 'Ctrl-Alt-M');

    });

});
