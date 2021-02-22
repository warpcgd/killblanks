interface Store {
  state: {
    skeletonInfo: any
    inspectedDomName: string
  }
}

export const store: Store = {
  state: {
    skeletonInfo: {},
    inspectedDomName: ''
  }
}
