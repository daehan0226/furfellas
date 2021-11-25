## [Furfellas](http://furfellas.foxlee.kr/)
![furfellas_gallery](https://user-images.githubusercontent.com/47915302/141996996-1fee40c1-9a20-4167-8953-c85cd0724965.png)
![furfellas_photo_form](https://user-images.githubusercontent.com/47915302/141684758-f2cc6da4-8bae-4e58-a6ff-2b46ab4336c4.png)
![20211125_172800](https://user-images.githubusercontent.com/47915302/143406050-325728c4-795d-4f6e-9383-12963e4f74bc.png)

### 소개
* Sevi 와 Aibi의 소개 및 사진과 해야할 일들을 기록하는 프로젝트

### 주요 기능
* Sevi, Aibi 사진 업로드(사진 속 하는 여러 행동, 사진을 찍은 위치 등)
* 필터를 통한 사진 검색
* 할일 등록하기(약 먹기, 사료 구매 등등)

### 추가 예정중인 기능
* 지도 API 를 연동하여 지도로 위치별 핀, 이미지 보여주기 기능
* 사진 업로드시 같은 정보(행동,위치)의 복수개의 이미지 등록 기능

## Front
### 주 기능
* amazon S3
  * github action 을 통한 자동 배포
* styled-component
  * 가로 길이에 따른 스타일 - 웹/모바일/타블렛에 따른 반응형 웹
  * primary, secondary color(light, main, dark..)으로 관리
* Context
  * 행동, 위치, 사진 유형 등의 데이터 관리
* Redux
  * 관리자 로그인 유지
* AntDesign - Form, Table
  * Photo, todo crud customizing
