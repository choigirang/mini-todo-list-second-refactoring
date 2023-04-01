import { atom } from "recoil";
// Recoil 라이브러리의 타입 중 하나로 atom과 selector 모두를 포함하여
// 사용되는 모든 상태 타입의 부모 타입이다.
// RecoilState<boolean>은 boolean값을 저장하고 업데이트 한다.

// Home 컴포넌트에서 사용 Btn
export const penAlterState = atom({
  key: "penAlterState",
  default: false,
});

export const selectNumState = atom({
  key: "selectNumState",
  default: -1,
});

export const stopAlterState = atom({
  key: "stopAlterState",
  default: true,
});

// Main 컴포넌트에서 사용 Btn
export const rejectAlterState = atom({
  key: "rejectAlterState",
  default: true,
});

// Main 이름 입력창
export const nameInputState = atom({
  key: "nameInputState",
  default: false,
});
export const tippingName = atom({
  key: "tippingName",
  default: "",
});

// Todo 추가 리스트
export const itemState = atom({
  key: "itemState",
  default: [
    { id: 1, room: "엄마방", tool: "청소기돌리기" },
    { id: 2, room: "아빠방", tool: "청소기돌리기" },
    { id: 3, room: "내방", tool: "청소기돌리기" },
  ],
});
// selector - atom을 기반으로 파생된 값을 계산할 때 사용
// const mySelector = selector({
//     key: 'mySelector',
//     get: ({ get }) => {
//       const myAtomValue = get(myAtom);
//       return myAtomValue.toUpperCase();
//     },
//   });

// atom 값을 가져오려면 useRecoilValue
// const myAtomValue = useRecoilValue(myAtom);
