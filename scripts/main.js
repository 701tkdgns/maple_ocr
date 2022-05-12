var chooseFile = document.getElementById('chooseFile');
chooseFile.onchange = async function(e){
  var fr = new FileReader();
  fr.readAsDataURL(e.target.files[0]);
  fr.onload = async function(e){

    // submit한 이미지 slicing
    const newImage =  {image: e.target.result.slice(23)};
    console.log(newImage);

    // 서버로 전송 methon : POST, base64 변환 후 반환
    fetch("http://121.173.49.125:5000/"+'post', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newImage),
    })
    .then((response) => response.json())
    .then((data) => {

      // base64로 변환된 이미지 초기화 및 선언
      var b64 = data.param;
      changedImage = new Image()
      changedImage.src = 'data:image/gif;base64,' + b64;
      changedImage.style.width = "25%";
      changedImage.style.height = "25%";

      // 이미지를 보일 컨테이너 선언, 이미지가 뜨면
      var container = document.getElementById('image-show');
      container.appendChild(changedImage);
      container.style.visibility = "visible";

       var newImage = document.getElementById('image-show').lastElementChild;

    //   이미지는 화면에 나타나고
      newImage.style.visibility = "visible";

      //이미지 업로드 버튼은 숨겨진다
      document.getElementById('chooseFile_btn').style.visibility = 'hidden';

    })
    .catch((error) => console.log("error:", error));
  }
}