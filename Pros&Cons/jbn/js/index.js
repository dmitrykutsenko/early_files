(function ($, undefined) {

  var template = [
    '<li class="item ui-sortable-handle">'
    ,'<a class="btn-floating waves-effect waves-light grey"><i class="mdi-content-remove right"></i></a>'
    ,'<div class="weight-container">'
    ,'<a class="weight-up"><i class="small mdi-navigation-arrow-drop-up weight-maker"></i></a>'
    ,'<strong> 0 </strong>'
    ,'<a class="weight-down"><i class="small mdi-navigation-arrow-drop-down weight-maker"></i></a>'
    ,'</div>'
    ,'<h3>New reason to describe...</h3>'
    ,'<div class="textinput">'
    ,'<input type="text"><button class="mdi-action-done"></button>'
    ,'</div>'
    ,'</li>'
  ].join('');

  var countPros = 0;
  var countCons = 0;

  var currInput = undefined;

  var deletingItem = undefined;
  var delBtns;
  var delUndoMsgTO = 3000;

  $('.row').animate({opacity: 0}, 500, function() {

    var i = 0;
    while (i == 0 || i > 6) {
      i = Math.random().toString()[6];
    }
    $(this).css('background', 'url(images/sagano-bamboo-forest-0' + (i) + '.jpg) no-repeat 100% 100%').animate({opacity: 1});
    $(this).css('background-size', '100%');
  });

  ///*** render

  function render() {

    function currCount(currList) {
      var counter = [];
      var i = 0, j = 0;
      counter = _.toArray($(currList)).map(function (item) {
        if (item.style.display !== 'none' && item.parentNode.style.display !== 'none') {
          if (currList.indexOf('li') >= 0) {
            return ++i;
          }

          if (currList.indexOf('weight') >= 0 && parseInt(item.textContent) !== 0) {
            // return i += parseInt(item.textContent);
            j += parseInt(item.textContent);
          }
        }
      });

      return currList.indexOf('weight') >= 0 ? j : _.compact(counter).length;
    }

    countPros = currCount('#pros .weight-container strong');
    $('h2')[1].textContent =  currCount('#pros ul li') + ' Pros (' + countPros + ')';
    countCons = currCount('#cons .weight-container strong');
    $('h2')[3].textContent =  currCount('#cons ul li') + ' Cons (' + countCons + ')';
    $('h2')[2].textContent = '';
    console.log(countPros, countCons);
    if (countPros === countCons) {
      $('h2')[2].classList.add('mdi-action-thumbs-up-down');
      $('h2')[2].classList.remove('mdi-action-thumb-up');
      $('h2')[2].classList.remove('mdi-action-thumb-down');
    }
    else {
      if (countPros > countCons) {
        $('h2')[2].classList.remove('mdi-action-thumbs-up-down');
        $('h2')[2].classList.remove('mdi-action-thumb-down');

        $('h2')[2].classList.add('mdi-action-thumb-up');
      } else {
        $('h2')[2].classList.remove('mdi-action-thumbs-up-down');
        $('h2')[2].classList.remove('mdi-action-thumb-up');

        $('h2')[2].classList.add('mdi-action-thumb-down');
      }

    }

    delBtns = $('.btn-floating, .grey');
    if (delBtns) {
      for (var i = 0; i < delBtns.length; i++) {
        delBtns[i].style.visibility = deletingItem === undefined ? 'visible' : 'hidden';
      }
    }

  }

  //*** sortable definitions

  $('#pros').children('ul').sortable({
    connectWith: '#cons > ul'
    ,remove: function pro(event, ui) {
      render();
    }
    ,receive: function (event, ui) {
      render();
    }
  });

  $('.cons').children('ul').sortable({
    connectWith: '#pros > ul'
    ,remove : function con(event, ui) {
      render();
    }
    ,receive: function (event, ui) {
     render();
    }
  });

  $('ul').sortable({
    placeholder: 'placeholder',
    connectWith: 'ul',
    receive: function (event, ui) {
      render();
    },
    stop: function (event, ui) {
      render();
    }
  });

  //*** events handlers

  $('.add-btn').click( function(event) {
    if (event.target.parentNode.classList.contains('pros-holder')) $('.pros-holder ul').append(template);
    else if (event.target.parentNode.classList.contains('cons-holder')) $('.cons-holder ul').append(template);
  });

  $('.pros-holder').hover( function( event ) {
    $('.cons-holder .btn')[0].style.visibility = 'hidden';
    $('.pros-holder .btn')[0].style.visibility = 'visible';
  });
  $('.cons-holder').hover(function( event ) {
    $('.pros-holder .btn')[0].style.visibility = 'hidden';
    $('.cons-holder .btn')[0].style.visibility = 'visible';
  });

  function applyInputValue(e) {
    if (e && e !== undefined) {
      var prevSiblingInput = e; //looking for closest input
      var parentBlock = e.parentNode;           //parent div .textinput
      var currH3 = parentBlock.previousElementSibling;     //current h3 to display

      if (prevSiblingInput.tagName === 'INPUT') {
        if (prevSiblingInput.value) currH3.textContent = prevSiblingInput.value; //value from input
        else currH3.textContent = 'New reason to describe...';//default value
        parentBlock.style.display = 'none'; //.textinput
        currH3.style.display = 'inline-block';

        e.removeEventListener('keyup', inputOnKeyUp);
        e.removeEventListener('change', inputOnChange);
        //e.removeEventListener('blur', inputOnChange);
        e = undefined;
      }
    }
  }

  inputOnKeyUp = function fnInputOnKeyUp() {
    if (arguments[0].keyCode === 13) {
      if (currInput !== this) currInput = this;
      applyInputValue(currInput);
    }
  };

  inputOnChange = function fnInputOnChange() {
    if (currInput !== this) currInput = this;
    applyInputValue(currInput);
  };

  inputOnBlur = function fnInputOnChange() {
    if (currInput !== this) currInput = this;
    applyInputValue(currInput);
  };


  $('.ui-sortable').click( function(event) {
    //event.stopPropagation();
    event.preventDefault();

    // weighting process for every item
    if (event.target.classList.contains('mdi-navigation-arrow-drop-up')) {
        event.target.parentNode.parentNode.children[1].textContent = parseInt(event.target.parentNode.parentNode.children[1].textContent, 10) + 1;
    }
    if (event.target.classList.contains('mdi-navigation-arrow-drop-down')) {
        event.target.parentNode.parentNode.children[1].textContent = parseInt(event.target.parentNode.parentNode.children[1].textContent, 10) - 1;
    }

    // renaming items
    if (event.target.tagName === 'H3') {
      event.target.style.display = 'none'; //h3
      var parentBlock = event.target.parentNode; //.item
      if (parentBlock.classList.contains('item')) {
        parentBlock.lastElementChild.style.display = 'inline-block'; //.textinput

        currInput = parentBlock.lastElementChild.firstElementChild;
        currInput.value = event.target.textContent;
        currInput.addEventListener('keyup', inputOnKeyUp);
        currInput.addEventListener('change', inputOnChange);
        currInput.addEventListener('blur', inputOnChange);
      }

    }

    // editing items
    if (event.target.tagName === 'INPUT') {
      currInput = event.target;
      currInput.addEventListener('keyup', inputOnKeyUp);
      currInput.addEventListener('change', inputOnChange);
      currInput.addEventListener('blur', inputOnChange);
    }

    // ok button click
    if (event.target.tagName = 'BUTTON' && event.target.parentNode.classList.contains('textinput')) {
      applyInputValue(event.target.previousSibling);
    }

    // deleting process for every item (with undo notification)
    if (event.target.classList.contains('mdi-content-remove')) {

      deletingItem = event.target.parentNode.parentNode;

      if (deletingItem) {

        var itemText =  event.target.parentNode.parentNode.children[2].textContent;
        Materialize.toast('<span>'+itemText+' will be deleted from '+event.target.parentNode.parentNode.parentNode.parentNode.id+'</span><a class=&quot;undo btn-flat &quot; href=&quot;#!&quot;>&nbsp;&nbsp;&nbsp;Undo<a>', delUndoMsgTO);

        setTimeout(function () {
          if (deletingItem) {

            deletingItem.querySelector('strong').textContent = '0';

            deletingItem.style.display = 'none';
            render();
            deletingItem = undefined;
          }
        }, delUndoMsgTO+1000);

        setTimeout(function () {
          render();
        }, delUndoMsgTO+1000);
      }
    }

    render();
  });


  $('body').click( function( event ) {
    event.preventDefault();
    if (event.target.classList.contains('"undo')) {
      deletingItem = undefined;
      event.target.parentNode.style.visibility = 'hidden';
    }

    render();
  });

  render();

}) (jQuery);