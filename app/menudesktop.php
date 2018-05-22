<!--=== lista de variáveis ===-->

<script>
    if(window.parent.innerWidth >= 1200 && window.parent.innerWidth <= 1599){
        $('#containerDesc').css("top", "-210");
        $('#containerDownload').css("top", "-200");
        $('#containerTree').css("top", "-210");

        $('.results-content').find('.container').css("width", "75%");
        $('.results-content').find('.container').css("margin", "auto");


        $('#containerDownload').css("display", "block");
        $('#containerDownload').find("row").css("padding-left", "0");

        $('#view-boxes').css("padding-left", "2%");
        $('#view-boxes').css("padding-right", "2%");

        $('.data-values').css("flex-direction", "row");
        $('.percent-value').css("height", "auto");

        $('#view_box_scc').css("height", "80%");
        $('#view_box_scc').css("width", "75%");

        $('#containerTree #menu-view').css("width", "20%");
        $('#containerTree #menu-view').css("height", "80%");

        $('#title-view-leg-scc').css("height", "80%");
        $('#title-view-leg-scc').css("height", "80%");

        $('.results-content').find(".container").css('width','100%')

        $("#containerDados").removeClass("col-md-5")
        $("#containerDados").addClass("col-md-6")

        $("#containerMapa").removeClass("col-md-5")
        $("#containerMapa").addClass("col-md-6")

        $("#containerBarra").removeClass("col-md-5")
        $("#containerBarra").addClass("col-md-6")

        $("#containerDesc").removeClass("col-md-5")
        $("#containerDesc").addClass("col-md-6")

        $("#containerTree").removeClass("col-md-10")
        $("#containerTree").addClass("col-md-12")

        $("#containerDownload").removeClass("col-md-10")
        $("#containerDownload").addClass("col-md-12")

    }

</script>

