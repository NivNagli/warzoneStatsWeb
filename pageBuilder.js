const createSearchPage = ({
    mainContainerClassName,
    innerSelectContainerID,
    onSelectMethod
}) => {
    selectContainer = document.querySelector("." + mainContainerClassName).querySelector("#" + innerSelectContainerID);
    if(!selectContainer) return;
    // console.log(selectContainer);
    selectContainer.addEventListener('change', onSelectMethod);
}

