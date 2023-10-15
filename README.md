const --> 값을 업데이트가 할 필요 없을 때
let --> 값을 업데이트할 경우가 있을 때
var 사용을 지양하는 이유
코드가 밑에서 뭘 할지 알수가 없다
즉, 코드의 의미를 파악하기 어렵다

데이터타입
null : 자연적으로 발생하지 않음, 값이 없음을 의도적으로 표현하는 것 (비어있음)
undefined : 변수는 선언되었으나 값이 아직 주어지지 않음

배열
값을 리스트로 정리하는 것 
목적: 하나의 변수 안에 데이터의 리스트를 가지는 것
ex ) 구매리스트
push --> 배열 항목 추가

객체

function
반복해서 사용할 수 있는 코드 조각
목적: 여러가지 일을 같은 코드로 하기 위함

document 객체는 JS에서 HTML에 접근할 수 있는 방법

querySelector() -> css 셀럭터를 사용해서 검색할 수 있음
querySelectorAll() -> 배열을 반환해줌

console.dir()
->요소의 내부를 보고싶을 때 사용
객체로 표시한 요소를 보여줌
property앞에 on이 붙어있으면 event listener

loginForm.addEventListener('submit', onLoginSubmit);
함수명 뒤에 ()를 추가하는 것(onLoginSubmit())은 function을 '즉시' 실행한다는 의미

form은 submit하면 브라우저는 기본적으로 페이지를 새로고침하도록 되어있음
preventDefault() -> 브라우저가 기본동작을 실행하지 못하도록 막아줌

변수명을 대문자로 표기하는 경우(관습!)
string만 포함된 변수는 대문자로 표기, 즉 string을 저장하고 싶을 때 사용할 경우

local storage는 우리가 브라우저에 뭔가를 저장할 수 있게 해줌. 그래서 나중에 가져다 사용 가능
정보를 저장하고 불러오고 삭제하는 브라우저가 가지고있는 작은 DB같은 API
local storage에 없는 정보를 불러오려고 하면 null 값을 받음

[clock]
setInterval(sayHello, 1000);
sayHello() 라는 펑션을 1초마다 반복한다는 의미.
단 바로 실행되지 않고 1초 후 첫 시작이 되고 계속 1초마다 반복된다.

setTimeout(sayHello, 1000);
1초 기다렸다가 한번만 실행.
padStart() -> string이 가져야하는 길이, 그렇지 않다면 앞쪽에 채워넣을 값
date 생성자 함수에서 가져온 시간들은 number 타입이므로  string으로 변환한 뒤 padStart 적용해야함

parentNode = parentElement
누가 그 button의 부모이냐

JSON.stringify
객체나 배열 또는 어떤 코드건 간에 string으로 만들어줌

forEach
array에 있는 각각의 item에 대해 함수 실행해줌

innerText와 innerHTML은 JavaScript에서 HTML 요소의 내용을 가지고 오거나 변경할 때 사용하는 두 가지 방법입니다. 두 속성이 비슷해 보일 수 있지만 중요한 차이점이 있습니다.

innerText는 요소의 "가시적인" 텍스트만을 반환합니다. 스크립트나 스타일 태그 내부의 텍스트, HTML 태그 등은 포함되지 않습니다. 또한 innerText는 렌더링 된 텍스트를 가져오므로 CSS를 통해 숨겨진 요소의 텍스트는 가져오지 않습니다.

innerHTML는 요소의 HTML을 반환합니다. 이것은 태그들을 포함한 문자열 형태로 반환되므로, 요소 내부의 모든 내용을 포함합니다. HTML 태그들도 문자열로 인식하여 반환합니다.

따라서, HTML 태그를 포함한 전체 구조를 가지고 오거나 설정하려는 경우 innerHTML을 사용하는 것이 좋습니다. 반면, 순수한 텍스트 콘텐츠만을 가지고 오고자 하는 경우에는 innerText를 사용하면 됩니다.

그러나 innerHTML을 사용할 때는 주의가 필요합니다. innerHTML을 사용해 사용자의 입력을 직접 페이지에 삽입하는 경우, 악성 스크립트가 삽입되어 XSS(Cross-Site Scripting) 공격에 취약해질 수 있습니다. 이런 상황을 방지하려면 사용자의 입력을 적절히 처리하거나, 가능한 경우 innerText나 textContent를 사용하는 것이 더 안전합니다.