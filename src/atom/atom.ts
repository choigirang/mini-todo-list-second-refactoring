import { atom, RecoilState, selector } from "recoil";
// Recoil 라이브러리의 타입 중 하나로 atom과 selector 모두를 포함하여
// 사용되는 모든 상태 타입의 부모 타입이다.
// RecoilState<boolean>은 boolean값을 저장하고 업데이트 한다.

export const penAlter = atom({
  key: "trueOrFalse",
  default: false,
});

export const rejectAlter = atom({
  key: "rejectAlter",
  default: false,
});

export const nameInput = atom({
  key: "nameInput",
  default: false,
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
