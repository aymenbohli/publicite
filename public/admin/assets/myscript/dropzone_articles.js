Dropzone.autoDiscover = false;
$(".dropzone").dropzone({
    url: "upload.php",
    acceptedFiles: ".png,.jpg,.gif,.bmp,.jpeg",
    parallelUploads: 100,
    maxFiles: 100,
    autoProcessQueue: false,
    autoQueue: true, // Make sure the files aren't queued until manually added
    init: function () {
        myDropzone = this;
        $.ajax({
            url: 'upload.php',
            type: 'post',
            data: {request: 2},
            dataType: 'json',
            success: function (response) {
                $.each(response, function (key, value) {
                    var mockFile = {name: value.name, size: value.size};

                    myDropzone.emit("addedfile", mockFile);
                    myDropzone.emit("thumbnail", mockFile, value.path);
                    myDropzone.emit("complete", mockFile);

                });

            }
        });

        var submitButton = document.querySelector("#submit-all");
        var wrapperThis = this;

        submitButton.addEventListener("click", function () {
            wrapperThis.processQueue();
        });
        this.on(
            "sending", function (file, xhr, formData) {
                var str = file.previewElement.querySelector("#nbauto").value;
                formData.append("nbauto", str);
            })

        this.on("addedfile", function (file) {

            // Create the remove button


            // Create the remove button
            var removeButton = Dropzone.createElement("<button class='btn btn-danger' id='rm'>Remove</button>");

            // Listen to the click event
            removeButton.addEventListener("click", function (e) {
                // Make sure the button click doesn't submit the form:
                e.preventDefault();
                e.stopPropagation();

                // Remove the file preview.
                var imageId = $(this).parent().find(".dz-filename > span").text();
                $.ajax({
                    url: 'upload.php',
                    data: {imageId: imageId, request: 3},
                    type: 'POST',
                    success: function (data) {
                        $(this).parents(".dz-preview").remove();
                    },
                    error: function (data) {
                    }
                })

                $(this).parent().remove();
                // If you want to the delete the file on the server as well,
                // you can do the AJAX request here.
            });
            // Add the button to the file preview element.
            file.previewElement.appendChild(removeButton);
        });
    }
});

/*
$(document).ready(function () {


    getWorkshops();
    createworkshops();
    getEditworkshop();

    function lanuge() {
        var langue = $('#langue ').val();
        if (langue == '1') {
            $('.workshop_ln_en').hide();
            $('.workshop_ln_fr').show()
        } else if (langue == '2') {
            $('.workshop_ln_fr').hide();
            $('.workshop_ln_en').show();
        } else {
            $('.workshop_ln_en').show()
            $('.workshop_ln_en').show()
        }
    }

    lanuge();


    $(function () {
        $("div#create-workshop").on('hidden.bs.modal', function () {
            $("#create-workshop").find("input[name='id']").val('');
            $("#create-workshop").find("input[name='title_fr']").val('');
            $("#create-workshop").find("input[name='title_en']").val('');
            $("#create-workshop").find("textarea[name='description_fr']").val('');
            $("#create-workshop").find("textarea[name='description_en']").val('');
            $("#create-workshop").find("input[name='date']").val('');
            $("#create-workshop").find("input[name='start_time']").val('');
            $("#create-workshop").find("input[name='end_time']").val('');
            $("#create-workshop").find("input[name='place']").val('');
            $("#create-workshop").find("input[name='stock']").val('');
            $("#create-workshop").find("input[name='allowed_number']").val('');
            $("#create-workshop").find("input[name='workshop_id']").val('');

            $("#create-workshop #price").val('');

            $('.nav-tabs a[href="#myTab2_example66"]').tab('show');
            $('label.error').hide();
            getWorkshops();
        });
    });


    $(function () {
        /!*  $("#date_workshops").datepicker({dateFormat: 'yy-mm-dd'});
         $("#date_workshops").datepicker('setDate', new Date());
         $('#time_start_workshop').timepicker({format: 'hh:mm'});
         $('#time_end_workshop').timepicker({format: 'hh:mm'});
         *!/
        $('#time_start_workshop').timepicker({format: 'hh:mm'});
        $('#time_end_workshop').timepicker({format: 'hh:mm'});
        $("input#date_workshops").datepicker({format: 'yyyy-mm-dd'});
    });


    function getWorkshops() {
        var event = $("#event").attr('value');

        $.ajax({
            type: 'POST',
            url: url + 'index.php?api=getWorkshop',
            dataType: 'json',
            cache: false,
            data: {event: event},
            success: function (result) {
                var rows = '';
                $.each(result.data, function (key, value) {
                    var allnb = value.stock == -1 ? 'illimité' : value.stock;
                    var allallowed = value.allowed_number == -1 ? 'illimité' : value.allowed_number;

                    rows = rows + '<tr>';
                    rows = rows + '<td class="workshop_ln_fr">' + value.title_fr + '</td>';
                    rows = rows + '<td class="workshop_ln_en">' + value.title_en + '</td>';
                    rows = rows + '<td class="workshop_ln_fr">' + value.description_fr + '</td>';
                    rows = rows + '<td class="workshop_ln_en">' + value.description_en + '</td>';
                    rows = rows + '<td>' + value.place + '</td>';
                    rows = rows + '<td>' + value.date + '</td>';
                    rows = rows + '<td class="hidden">' + value.stock + '</td>';
                    rows = rows + '<td class="hidden">' + value.allowed_number + '</td>';
                    rows = rows + '<td class="hidden">' + value.start_time + '</td>';
                    rows = rows + '<td class="hidden">' + value.end_time + '</td>';
                    rows = rows + '<td data-id="' + value.id + '">';
                    rows = rows + '<button data-toggle="modal" data-target="#create-workshop" class="btn btn-yellow edit-workshop btn-xs"><i class="fa fa-edit"></i></button> ';
                    rows = rows + '<button class="btn btn-danger remove-worksh btn-xs"><i class="fa fa-close"></i> </button>';
                    rows = rows + '<button class="btn btn-primary modal-photo-workshop  btn-xs" style="margin: 3px;" data-toggle="modal" data-target="#modal-photo-workshop" ><i class="fa fa-picture-o"></i> </button>';
                    rows = rows + '</td>';
                    rows = rows + '</tr>';
                });
                $("#body_workshop").html(rows);
                var table = $('#table_Workshop').dataTable();
                lanuge();
            },
            error: function () {
                var rows = '';
                /!* rows = rows + '<tr><td class="workshop_ln_fr"></td><td class="workshop_ln_en"></td>' +
                 '<td class="workshop_ln_fr"></td><td class="workshop_ln_en"></td><td></td><td></td>' +
                 '<td class="hidden"></td><td class="hidden"></td><td class="hidden"></td><td class="hidden"></td><td></td>';
                 *!/
                $("#body_workshop").html(rows);
                var table = $('#table_Workshop').dataTable();
                lanuge();
            }
        });
    }

    function getEditworkshop() {
        $("body").on("click", ".edit-workshop", function (e) {
            e.preventDefault();

            var id = $(this).parent("td").data('id');
            var titre_fr = $(this).closest('tr').children('td:nth-child(1)').text();
            var titre_en = $(this).closest('tr').children('td:nth-child(2)').text();
            var description_fr = $(this).closest('tr').children('td:nth-child(3)').text();
            var description_en = $(this).closest('tr').children('td:nth-child(4)').text();
            var place = $(this).closest('tr').children('td:nth-child(5)').text();
            var date = $(this).closest('tr').children('td:nth-child(6)').text();
            var stock = $(this).closest('tr').children('td:nth-child(7)').text();
            var allowed_number = $(this).closest('tr').children('td:nth-child(8)').text();
            var start_time = $(this).closest('tr').children('td:nth-child(9)').text();
            var end_time = $(this).closest('tr').children('td:nth-child(10)').text();

            $("#create-workshop").find("input[name='title_fr']").val(titre_fr);
            $("#create-workshop").find("input[name='title_en']").val(titre_en);
            $("#create-workshop").find("textarea[name='description_fr']").val(description_fr);
            $("#create-workshop").find("textarea[name='description_en']").val(description_en);
            $("#create-workshop").find("input[name='place']").val(place);
            $("#create-workshop").find("input[name='date']").val(date);
            $("#create-workshop").find("input[name='stock']").val(stock);
            $("#create-workshop").find("input[name='allowed_number']").val(allowed_number);
            $("#create-workshop").find("input[name='start_time']").val(start_time);
            $("#create-workshop").find("input[name='end_time']").val(end_time);
            $("#create-workshop").find("input[name='allowed_number']").val(allowed_number);

            $("#create-workshop").find("input[name='stock']").val(stock);
            $("#create-workshop").find("#workshop_id").val(id);

            getcountry_group_id_workshops(id)

        });
    }


    $("body").on("click", ".modal-photo-workshop", function (e) {
        e.preventDefault();
        var id = $(this).parent("td").data('id');
        var event = $("#event").val();
        $.ajax({
            url: 'index.php?api=createUploadsWorkshop',
            type: 'post',
            data: {request: 2, event: event, workshop_id: id},
            dataType: 'json',
            success: function (response) {
                $('#demo-modal-photo-workshop').html('<div class="row imglist"></div>');
                $.each(response, function (key, value) {
                    $(".imglist").append('<div class="col-md-3"><a href="' + value.path + '" data-fancybox="images">' +
                        '<img width="100%" height="200px" style="overflow: hidden" src="' + value.path + '" /></a></div>');
                });
            }
        });
    });


    $("#creates_workshops").click(function (e) {
        e.preventDefault();

        var room = 'create';
        getcountry_group_id_workshops(room);
    });


    function createworkshops() {
        $("#save-workshop").click(function (e) {
            e.preventDefault();
            if (validateworkshops() == true) {
                var formData = new FormData($('#form_workshop')[0]);
                formData.append('event', $("#event").val());
                var result = '';
                $.ajax({
                    type: "POST",
                    url: url + 'index.php?api=createWorkshop',
                    data: formData,
                    processData: false,
                    contentType: false,
                    async: false,
                    dataType: "json",
                    success: function (data, textStatus, jqXHR) {
                        $("input#workshop_id").val(data.workshops_id);
                        toastr.success(data.type, data.message, {timeOut: 5000});
                    },
                    error: function (data, textStatus, jqXHR) {
                        toastr.error('error', 'error Alert', {timeOut: 5000});
                    },
                });
            }
        });
    }


    function getcountry_group_id_workshops(id) {
        var event = $("#event").attr('value');
        var user = $("#user_id").attr('value');
        //var workshops = $("form#form_workshop input[name=id]").attr('value');

        if (id == 'create') {
            var urls = 'index.php?api=getCountryGroupByEvent';
        } else {
            var urls = 'index.php?api=getWorkshopsByEvent';
        }
        $.ajax({
            type: 'POST',
            url: url + '' + urls,
            dataType: 'json',
            cache: false,
            data: {event: event,workshops:id,user:user},
            success: function (result) {
                var rows = '';
                $.each(result.data, function (key, value) {
                    rows = rows + ' <div class="form-group">';
                    rows = rows + '<input type="hidden" value="' + value.id_c + '" name="country_group_id[]">';
                    rows = rows + '<label>Prix ' + value.title_fr + ' <span class="symbol required"></span></label>' +
                        '<input type="number" id="price" placeholder="prix" ' +
                        'class="form-control" name="price[]" min="0" value="' + value.price + '" required="required"/>';
                    rows = rows + '</div>';
                });
                $("#country_group_id_workshop").html(rows);
            },
            error: function () {

            }
        });
    }


    Dropzone.autoDiscover = false;
    var myDropzone = new Dropzone('#wrksh .dropzone', {
        url: "index.php?api=createUploadsWorkshop",
        acceptedFiles: ".png,.jpg,.gif,.bmp,.jpeg",
        parallelUploads: 100,
        maxFiles: 100,
        uploadMultiple: false,
        autoProcessQueue: false,
        autoQueue: true, // Make sure the files aren't queued until manually added


        init: function () {
            var event = $('#event').val();
            $('[href=#myTab2_example77]').on('shown.bs.tab', function (e) {
                e.preventDefault();
                $("#wrksh .dropzone .dz-message").remove();
                $("#wrksh .dz-preview").remove();
                $('#wrksh .dropzone').append('<div  class="dz-message" data-dz-message><span>drop files here to upload</span></div>');
                var workshop_id = $('#workshop_id').val();

                $.ajax({
                    url: 'index.php?api=createUploadsWorkshop',
                    type: 'post',
                    data: {request: 2, event: event, workshop_id: workshop_id},
                    dataType: 'json',
                    success: function (response) {
                        $.each(response, function (key, value) {
                            var mockFile = {
                                name: value.name,
                                size: value.size,
                                path: value.path,
                                selected: value.selected
                            };
                            myDropzone.emit("addedfile", mockFile);
                            myDropzone.emit("thumbnail", mockFile, value.path);
                            myDropzone.emit("complete", mockFile);
                            myDropzone.emit("selected", mockFile);
                            if (value.selected == '1') {
                                $("#selected" + value.name).attr('checked', 'checked');
                                $("#selected" + value.name).attr('value', '1');
                            } else {
                                $("#selected" + value.name).attr('value', '0');
                            }
                        });
                    }
                });
            });

            var submitButton = document.querySelector("#submitwrksh");
            var wrapperThis = this;

            submitButton.addEventListener("click", function (e) {
                wrapperThis.processQueue();
                e.preventDefault();
            });

            this.on("sending", function (file, xhr, formData) {
                formData.append('workshops_id', $("#workshop_id").val());
                var radioanswer = $('input[name=selected]:checked').val();
                formData.append('selected', radioanswer);
                var name = new Date().getTime() + '_' + file.name;
                formData.append('image', name);
            });

            this.on("success", function (file, responseText) {
                $(file.previewElement).find('[data-dz-name]').html(responseText);
            });
            this.on("complete", function (file, responseText) {
                if (this.getUploadingFiles().length === 0 && this.getQueuedFiles().length === 0) {
                }
            });

            this.on("addedfile", function (file, responseText) {
                var selected = Dropzone.createElement("<div class='checked-row'><input type='radio' id='selected" + file.name + "' data-dz-selected name='selected' value='" + file.selected + "'/></div>");

                selected.addEventListener("click", function (e) {
                    // Make sure the button click doesn't submit the form:
                    var imageIds = $(this).parent().find(".dz-filename > span").text();
                    $(this).attr('checked', 'checked');
                    //$(this).attr('value', '1');

                    var workshop_id = $('#workshop_id').val();

                    $.ajax({
                        url: 'index.php?api=createUploadsWorkshop',
                        data: {imageIds: imageIds, request: 4, workshop_id: workshop_id},
                        type: 'POST',
                        success: function (data) {
                            if (data == 'true') {
                                toastr.success('Success', 'Choisir une photo de couverture', {timeOut: 5000});
                            } else {
                                toastr.error('error', 'Vous devez uploader les photos avant de choisir', {timeOut: 5000});
                            }
                        },
                        error: function (data) {
                        }
                    })
                    // e.preventDefault();
                    // e.stopPropagation();
                });

                // Create the remove button
                var removeButton = Dropzone.createElement("<div class='supp-row'><button class='btn btn-danger' id='rm'><i class='fa fa-close'></i></button></div>");

                // Listen to the click event
                removeButton.addEventListener("click", function (e) {
                    // Make sure the button click doesn't submit the form:
                    e.preventDefault();
                    e.stopPropagation();

                    // Remove the file preview.
                    var imageId = $(this).parent().find(".dz-filename > span").text();

                    $.ajax({
                        url: 'index.php?api=createUploadsWorkshop',
                        data: {imageId: imageId, request: 3},
                        type: 'POST',
                        success: function (data) {
                            $(this).parents(".dz-preview").remove();
                            toastr.success('Success', 'Photo supprimer avec succès', {timeOut: 5000})
                        },
                        error: function (data) {
                        }
                    })

                    $(this).parent().remove();
                    // If you want to the delete the file on the server as well,
                    // you can do the AJAX request here.
                });
                // Add the button to the file preview element.
                file.previewElement.appendChild(removeButton);
                file.previewElement.appendChild(selected);
            });
        }
    });


    /!* Remove social program *!/
    $("body").on("click", ".remove-worksh", function (e) {
        e.stopImmediatePropagation();
        var id = $(this).parent("td").data('id');
        var c_obj = $(this).parents("tr");
        $.confirm({
            title: 'Confirm!',
            content: 'voulez vous vraiment supprimer!',
            buttons: {
                confirm: function () {
                    $.ajax({
                        dataType: 'json',
                        type: 'POST',
                        url: url + 'index.php?api=deleteWorkshop',
                        data: {id: id}
                    }).done(function (data) {
                        if (data == true) {
                            c_obj.remove();
                            toastr.success('Success', 'Données supprimer avec succès', {timeOut: 5000})
                        } else {
                            toastr.error('error', 'Données n\'etais supprimé pas', {timeOut: 5000})
                        }
                    });
                },
                cancel: function () {
                },
            }
        });
    });
    function validateworkshops() {
        var requiredMsg = "Ce champ est obligatoire";
        $("form#form_workshop").validate({
            //ignore: [],
            // ignore: ".ignore",
            rules: {
                title_fr: {required: true},
                title_en: {required: true},
                description_fr: {required: true},
                description_en: {required: true},
                place: {required: true},
                date: {required: true},
                price: {required: true},
                start_time: {required: true},
                end_time: {required: true}
            },
            errorPlacement: function (error, element) {
                // render error placement for each input type
                if (element.is(':checkbox')) {
                    error.insertAfter($("#errorbox"));
                } else if ((element.attr('name') == 'date') || (element.attr('name') == 'start_time')
                    || (element.attr('name') == 'end_time')) {
                    error.insertAfter(element.parent('.input-group'));
                } else {
                    error.insertAfter(element);
                }
            },
            messages: {
                title_fr: {required: requiredMsg},
                title_en: {required: requiredMsg},
                description_fr: {required: requiredMsg},
                description_en: {required: requiredMsg},
                place: {required: requiredMsg},
                date: {required: requiredMsg},
                start_time: {required: requiredMsg},
                end_time: {required: requiredMsg},
                price: {required: requiredMsg}
            }
        });
        var res = $("form#form_workshop").valid();
        return res;
    }


});
*/

