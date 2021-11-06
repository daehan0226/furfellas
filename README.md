## Furfellas
![furfellas](https://github.com/daehan0226/daehan0226/blob/main/images/furfellas_s.png?raw=true)
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
* Redux
  * 관리자 로그인 유지 
* styled-component
  * 가로 길이에 따른 스타일 - 웹/모바일/타블렛에 따른 반응형 웹
  * primary, secondary color(light, main, dark..)으로 관리
* amazon S3
  * github action 을 통한 자동 배포
* Context
  * 사진 검색 필터의 키 관리
* Antdesign
  * Admin page에서 Antdesign form 적용 
