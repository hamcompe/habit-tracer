import React from "react"
import styled from "@emotion/styled"
import tw from "tailwind.macro"

const DialogBackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
  z-index: 1;
`
const DialogWrapper = styled.dialog`
  ${tw`rounded flex flex-col p-0 shadow-md`};
  position: fixed;
  top: 12%;
  left: 50%;
  width: 500px;
  max-width: 85vw;
  min-height: 150px;
  background: #fff;
  transform: translateX(-50%);
  z-index: 50;
`
const ContentSection = styled.div`
  ${tw`mt-4 mb-auto py-2 px-4`};
`
const ActionSection = styled.div`
  ${tw`mt-8 flex flex-row-reverse border-t border-gray-400 py-2 px-4`};
  > * {
    ${tw`ml-2`}
  }
`

export default ({
  open = false,
  onSubmit = () => {},
  onCancel = () => {},
  content,
}) => {
  return (
    open && (
      <>
        <DialogBackDrop
          onClick={() => {
            onCancel()
          }}
        />
        <DialogWrapper>
          <ContentSection>{content}</ContentSection>
          <ActionSection>
            <button
              type="button"
              css={tw`bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-2 px-4 rounded`}
              onClick={() => {
                onSubmit()
              }}
            >
              Delete
            </button>
            <button
              type="button"
              css={tw`bg-gray-100 border border-gray-400 hover:bg-gray-200 text-gray-900 text-sm font-bold py-2 px-4 rounded`}
              onClick={() => {
                onCancel()
              }}
            >
              Cancel
            </button>
          </ActionSection>
        </DialogWrapper>
      </>
    )
  )
}
