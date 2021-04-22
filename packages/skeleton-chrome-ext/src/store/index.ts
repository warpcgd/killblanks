interface Store {
  state: {
    skeletonInfo: any
    inspectedDomName: string
  }
  setSkeletonInfo: (name: string, data: any) => void
  setInspectedDomName: (name: string) => void
}

export const store: Store = {
  state: {
    skeletonInfo: {},
    inspectedDomName: ''
  },
  setSkeletonInfo(name: string, data: any) {
    this.state.skeletonInfo[name] = data
  },
  setInspectedDomName(name: string) {
    this.state.inspectedDomName = name
  }
}
