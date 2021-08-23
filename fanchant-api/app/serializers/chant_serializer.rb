class ChantSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :length
end
