(function(){

// ���J <ul> �� <li> �˪O
var tmpl = '<li><input type="text"><span></span></li>',
    addButton = $('#add'),
    connected = $('.connected'),      // �T�� <ul>
    placeholder = $('#placeholder'),  // �T�� <ul> ���e��
    mainUl = $('.main'),              // main <ul>
    deleteUl = $('.delete'),          // delete <ul>
    doneUl = $('.done');              // done <ul>

// �I�����s�ɡA���J�s����
//
addButton.on('click', function(){
  $(tmpl).prependTo(mainUl).addClass('is-editing').find('input').focus();
});

// �� Enter ���ɧ����s���æs��
//
mainUl.on('keyup', 'input', function(e){
  // �Y�ثe�����O�uenter�v
  if(e.which === 13){
    var input = $(this), li = input.parents('li');

    // �� <input> ���Ƚƻs�� <span> ��
    li.find('span').text( input.val() );

    // ���� <li> ���s���Ҧ��]is-editing class�^
    li.removeClass('is-editing');

    // �����Ӫ��s�i localStorage
    save();
  }
});

// �q localStorage Ū�X���Ӫ��A���i ul
load();

// �����Ӷ��ت��s�i localStorage
//
function save(){
  // �ǳƦn�n�˦U�Ӷ��ت��Ű}�C
  var arr = [];

  // �����C�� li�A
  // �� <span> �̪����ء]�@�Ӫ����G{text:���r, isDone:�O�_�Q����}�^���i�}�C��
  mainUl.find('li').each(function(){
    arr.push($(this).find('span').text());
  });

  // ���}�C�ন JSON �r�����s�i localStorage
  localStorage.todoItems = JSON.stringify(arr);
}

// �q localStorage Ū�X���Ӫ��A���i <ul>
//
function load(){
  // �q localStorage ��Ū�X�}�C JSON �r��
  // �� JSON �r�����^�}�C
  var arr = JSON.parse( localStorage.todoItems ), i, li;

  // �����}�C�̪��C�@�Ӷ��ءA���J�^ mainUl �̡C
  for(i=0; i<arr.length; i+=1){
    li = $(tmpl);
    li.appendTo(mainUl).find('span').text(arr[i]);
  }
}

// �Ұ��m�ߤ@
// �����s�i�H���ө��h
connected.sortable({
  connectWith: '.connected',
  tolerance: 'pointer'
});

// �Ұ��m�ߤG
// �즲���������è��ӿ���
mainUl.on('sortstart', function(){
  placeholder.addClass('is-dragging');
}).on('sortstop', function(){
  placeholder.removeClass('is-dragging');
  save();
});

// �Ұ��m�ߤT
// �R������
deleteUl.on('sortreceive', function(e, ui){
  ui.item.remove();
  save();
});

  // You need to complete "�w����"
  // �R������
doneUl.on('sortreceive', function(e, ui){
  ui.item.append().addClass('is-done').appendTo(mainUl);
   load();
  save();
 
});



}());
