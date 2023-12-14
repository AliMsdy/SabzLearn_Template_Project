import { SetState } from "@/types/shared"
type OverlayType = {
    showOverlay:boolean,
    setStateFunc: SetState<boolean>
}

function Overlay({showOverlay,setStateFunc}:OverlayType) {
  return (
    <div
        onClick={() => setStateFunc(false)}
        className={`absolute left-0 right-0 top-0 z-10 block h-screen w-screen bg-[rgba(0,0,0,0.5)] backdrop-blur-sm lg:hidden ${
            showOverlay ? "block" : "hidden"
        }`}
      />
  )
}

export  {Overlay}