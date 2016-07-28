(function () {
    
    var todoList = window.todoStore.list();
    var selectList = $('#toDoSelect');
    var table = $('#toDoTable');

    $(document).ready(function() {

        $('#total').html("Total Tasks: "+todoList.length);

        getTasks(todoList,true);

        $(function() {
            $("#compDate" ).datepicker();
        });

    });

    function deleteRow(item) {
        this.remove(); //Remove table row
        window.todoStore.remove(this.getElementsByClassName('hidden')[0].innerHTML); //remove task from storage
        location.reload();
    }

    $('#taskFilter').change(function(){

        if(this.value === 'complete'){

            function itemFilter(){
                return function(event){
                    return event.comp != "";
                }
            }

            var currentList = todoList.filter(itemFilter());
            $('#toDoTable tbody').html('');
            getTasks(currentList,false);

        }else if(this.value === 'incomplete'){
            
            function itemFilter(){
                return function(event){
                    return event.comp === "";
                }
            }

            var currentList = todoList.filter(itemFilter());

           $('#toDoTable tbody').html('');
           getTasks(currentList,false);
        
         }else{
            
            $('#toDoTable tbody').html('');
            var currentList = todoList;
            getTasks(todoList,false);
        }

    });

    $("#toDoSelect").change(function() {

        function itemFilter(item){

            return function(event){
                var id = event.id;
                return event.id === item;
            }
        }
    
        var currentItem = todoList.filter(itemFilter(this.value));
        $('#toDo').val(currentItem[0].item);
        $('#compDate').val(currentItem[0].comp);        

    });


    $('#saveButton').click(function(){

        var toDo = $('#toDo').val();
        var comp = $('#compDate').val();
        var selectVal = $('#toDoSelect').val()

        if(selectVal == "-1"){
            
            if(toDo != '' && toDo.length > 0){

                window.todoStore.newId(function(callback){
                
                    if(callback){
                        
                        console.log('save to do');

                        var id = callback;

                        var toDoItem = {
                            id: callback,
                            item: toDo,
                            comp: comp
                        }

                        window.todoStore.add(toDoItem);
                        location.reload();
                    }

                });

            }else{
                alert("You must enter a to do!");
            }

        }else{

            console.log("update " + selectVal);

            var toDoItem = {
                id: selectVal,
                item: toDo,
                comp: comp
            }
            
            window.todoStore.update(toDoItem);
            location.reload();

        }

    });

    function getTasks(filter,onload){
        
        for(var toDo in filter){
            
            var id = filter[toDo].id;
            var item = filter[toDo].item;
            var comp = filter[toDo].comp;

            var opt = document.createElement('option');
            
            if(onload){
                opt.value = id;
                opt.text = item;
                selectList.append(opt);
            }

            var tr = document.createElement('tr');
            
            var tdId = document.createElement('td');
            var tdToDo = document.createElement('td');
            var tdComp = document.createElement('td');
            var tdBtn = document.createElement('td');
            var btn = document.createElement('button');

            tdId.classList.add('col-sm-1');
            tdToDo.classList.add('col-sm-9');
            tdComp.classList.add('col-sm-1');
            tdBtn.classList.add('col-sm-1');

            btn.classList.add('btn', 'btn-danger');
            btn.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
            btn.addEventListener('click', deleteRow.bind(tr));

            tdId.innerHTML = id;
            tdId.classList.add('hidden');
            tdToDo.innerHTML = item;
            tdComp.innerHTML = comp;
            tdBtn.appendChild(btn);
            
            tr.appendChild(tdId);
            tr.appendChild(tdToDo);
            tr.appendChild(tdComp);
            tr.appendChild(tdBtn)

            table.append(tr);
            
        }
        
    }

})();