$(function () {
    $('.js-sortable').sortable({
        forcePlaceholderSize: true,
        placeholderClass: 'p1 mb1 bg-navy border border-yellow',
        dragImage: $('.ghost')[0]
    });
    $('.js-grid').sortable({
        forcePlaceholderSize: true,
        placeholderClass: 'col col-4 border border-maroon',
        dragImage: null
    });
    $('.js-sortable-disabled').sortable({
        forcePlaceholderSize: true,
        items: ':not(.disabled)',
        placeholderClass: 'border border-orange mb1'
    });
    $('.js-sortable-disabled-inner').sortable({
        forcePlaceholderSize: true,
        items: ':not(.disabled)',
        placeholderClass: 'border border-maroon mb1'
    });
    $('.js-sortable-connected').sortable({
        forcePlaceholderSize: true,
        connectWith: '.js-connected',
        handle: '.js-handle',
        items: 'li',
        placeholderClass: 'border border-white bg-orange mb1'
    });
    $('.js-sortable-inner-connected').sortable({
        forcePlaceholderSize: true,
        connectWith: 'js-inner-connected',
        handle: '.js-inner-handle',
        items: 'li',
        placeholderClass: 'border border-white bg-orange mb1'
    })
    $('.js-sortable-connected').on('sortupdate', function (e, obj) {
        console.log('Parent old: ');
        console.log(obj.startparent);
        console.log('Parent new: ');
        console.log(obj.endparent);
        console.log('Index: ' + obj.oldindex + ' -> ' + obj.index);
        console.log('elementIndex: ' + obj.oldElementIndex + ' -> ' + obj.elementIndex);
    });

    $('.js-sortable-buttons').sortable({
        forcePlaceholderSize: true,
        items: 'li',
        placeholderClass: 'border border-white mb1'
    });
    // buttons to add items and reload the list
    // separatly to showcase issue without reload
    $('.js-add-item-button').on('click', function () {
        $(this).parents().siblings('ul').append('<li class="p1 mb1 blue bg-white">new item</li>');
    });
    $('.js-reload').on('click', function () {
        console.log('Options before re-init:');
        console.log($(this).parents().siblings('ul').data('opts'));
        $(this).parents().siblings('ul').sortable();
        console.log('Options after re-init:');
        console.log($(this).parents().siblings('ul').data('opts'));
    });
    // JS DISABLEFD
    $('.js-disable').on('click', function () {
        var $list = $('[data-disabled]');
        var text = $(this).data('text');
        $(this).data('text', $(this).text()).text(text);
        if ($list.data('disabled') === false) {
            $list.sortable('disable');
            $list.data('disabled', true);
            $list.find('li').addClass('muted');
        } else {
            $list.sortable('enable');
            $list.data('disabled', false);
            $list.find('li').removeClass('muted');
        }
    });
    // Destroy & Init
    $('.js-destroy').on('click', function () {
        $(this).parents().siblings('ul').sortable('destroy');
    });
    $('.js-init').on('click', function () {
        $(this).parents().siblings('ul').sortable({
            forcePlaceholderSize: true,
            items: 'li',
            placeholderClass: 'border border-white mb1'
        });
    });

    $("#vList li.drop").on('click', function () {
        $("#vList li.drop").draggable("disable");
    })

    $("#vList, #dList").sortable({
        connectWith: ".connectedSortable",
        receive: function (ui, item) {
           
            if ($(ui.target).children('li:eq(1)').attr('class') == "p1 mb1 border border-white white bg-skyBlue drop ui-sortable-handle" || $(ui.target).children('li:eq(2)').attr('class') == "p1 mb1 border border-white white bg-green drivList")
            {
                alert("Sorry One Driver for One Vehicle");
                $(item.sender).sortable("cancel");
                }
            //alert($(this).attr("id"));

        },
        //receive: function (event, ui) { alert($(ui).closest('li').attr('id')); }
        stop: function (event, ui) {      

            var liIds = $('#vList li').map(function (i, n) {
                if ($(n).hasClass('drivList'))
                    return ($(n).prev().attr('id') + "-" + $(n).attr('id'));
            }).get().join(',');

            if ($("#vList li.drivList > i").hasClass("idrive"))
            {
                $("#vList li.drivList > i").addClass("glyphicon glyphicon-remove-sign")
            }
            $("#CollectedIds").val(liIds);
        }
    }).disableSelection();



    if($("#CollectedIds").val()!="")
    {
        var str = $("#CollectedIds").val().split(",");
        for(var i=0;i<str.length;i++)
        {
           
            var str1 = str[i].split('-');
           // var s = "#"+str1[0].toString();
            $("#" + str1[1].toString()).after($('<li id="' + str1[0] + '"class="p1 mb1 border border-white white bg-green drivList" role="option" aria-grabbed="false"><span class="js-handle px1 fa fa-arrows cursor" draggable="true" data-toggle="tooltip" title="Drag & Drop to Assign Driver to Vehicle"></span>' + str1[0] + '-' + str1[2] + '<a href="/DriverAssign/Delete/' + str1[0] + '-' + str1[1] + '" data-toggle="tooltip" title="Delete" ><i class="glyphicon glyphicon-remove-sign"></i></a></li>'));
        }
       
    }
    
    
    $(".idrive").click(function () {

        //alert($(this).parent().attr('id'));

       var s = $("#" + $(this).parent().attr('id')).text();
       var str = s.split(' - ');
       //alert(str1[0]);
       var html = $(this).parent().html();
       html = html.replace("glyphicon glyphicon-remove-sign", '');
       $('.-marleft10').append($('<ul id="dList" class="js-sortable-connected list flex flex-column list-reset dragable__list ui-sortable "  aria-dropeffect="move" ><li id="' + str[0] + '" class="p1 mb1 border border-white white bg-green drivList" role="option" aria-grabbed="false" draggable="true">' + html + '</li></ul>').sortable({ connectWith: ".connectedSortable" }));
       $('.idrive').draggable();
       $("#" + $(this).parent().attr('id')).remove();
    });
    // $('#vList').find('li.drivList').html('<i class="glyphicon glyphicon-remove-sign"></i>');

    

});