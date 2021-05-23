class ChantEventSerializer < ActiveModel::Serializer
  attributes :id, :scheduled_for

  has_one :chant
end
